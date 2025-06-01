@description('Name of the container app')
param appName string = 'pedidos-api'

@description('Container image to deploy, e.g. myrepo/myimage:tag')
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
param rabbitmqPassword string
param rabbitmqUser string = 'guest'
param rabbitmqHost string
param rabbitmqPort string = '5672'
param rabbitmqQueue string = 'pedidos-updates'


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
    }
    template: {
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
              name: 'RABBITMQ_USER'
              value: rabbitmqUser
            }
            {
              name: 'RABBITMQ_PASSWORD'
              value: rabbitmqPassword
            }
            {
              name: 'RABBITMQ_HOST'
              value: rabbitmqHost
            }
            {
              name: 'RABBITMQ_PORT'
              value: rabbitmqPort
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
