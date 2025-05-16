Mini-Todo est une application basée sur une architecture SOA/microservices, qui utilise les technologies suivantes :

API Gateway pour centraliser les points d'entrée (REST et GraphQL).
gRPC pour la communication entre microservices.
Kafka pour la gestion des événements (publication et consommation).
Docker Compose pour l'orchestration des services.

Prérequis:

Docker et Docker Compose
Node.js (pour exécuter les services localement si besoin)
Postman (pour tester les API)
Kafka (via Docker)

mini-todo/
├── apiGateway/               # API Gateway (REST + GraphQL)
│   ├── apiGateway.js         # Serveur principal
│   ├── resolvers.js          # Logique des requêtes GraphQL
│   ├── kafkaProducer.js      # Producteur Kafka
│   ├── schema.js             # Schéma GraphQL
│   ├── Dockerfile            # Dockerisation de l'API Gateway
│   └── package.json
├── taskService/              # Microservice gRPC ou JSON-RPC
│   ├── taskService.js        # Serveur gRPC ou JRPC
│   ├── task.proto            # Définition gRPC
│   ├── Dockerfile            # Dockerisation du microservice
│   └── package.json
├── docker-compose.yml        # Orchestration des services

