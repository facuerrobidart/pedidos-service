@description('Name of the container app')
param appName string = 'pedidos-api'

@description('Container image to deploy in format: ghcr.io/owner/repo:tag')
param dockerImage string

@description('Location for deployment')
param location string = resourceGroup().location

@secure()
param dbPassword string
@secure()
param dbUser string
param dbName string
@secure()
param dbHost string
param dbPort string = '5432'

@secure()
param rabbitmqUrl string
param rabbitmqQueue string = 'deliveries-queue'

@secure()
param ghcrUsername string
@secure()
param ghcrPassword string

resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: appName
  location: location
  properties: {
    managedEnvironmentId: resourceId('virtual-pet-backend', 'Microsoft.App/managedEnvironments', 'virtual-pet-env')
    configuration: {
      ingress: {
        external: true
        targetPort: 3000 // change to your app's exposed port
        transport: 'auto'
      }
      registries: [
        {
          server: 'ghcr.io'
          username: ghcrUsername
          passwordSecretRef: 'ghcr-password'
        }
      ]
      secrets: [
        {
          name: 'ghcr-password'
          value: ghcrPassword
        }
      ]
    }
    template: {
      scale:  {
        minReplicas: 1
        maxReplicas: 1
      }
      containers: [
        {
          name: 'api'
          image: dockerImage
          env: [
            {
              name: 'DB_USER'
              value: dbUser
            }
            {
              name: 'DB_PASSWORD'
              value: dbPassword
            }
            {
              name: 'DB_NAME'
              value: dbName
            }
            {
              name: 'DB_HOST'
              value: dbHost
            }
            {
              name: 'DB_PORT'
              value: dbPort
            }
            {
              name: 'RABBITMQ_URL'
              value: rabbitmqUrl
            }
            {
              name: 'RABBITMQ_QUEUE'
              value: rabbitmqQueue
            }
          ]
        }
      ]
    }
  }
}

output appUrl string = 'https://${containerApp.name}.${location}.azurecontainerapps.io'
