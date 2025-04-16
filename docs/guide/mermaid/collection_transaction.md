---
title: Collection Transaction - Bank Card
---

**Collection Transaction - Bank Card Flow**

``` mermaid
graph TD
    ExternalService --> ApiGateway
    ApiGateway --> Nats
    ApiGateway --> Database
    Nats --> AMLService
    AMLService --> Nats
    Nats --> BankCardCollectionsHandler
    BankCardCollectionsHandler --> CardNetwork
    CardNetwork --> BankCardCollectionsHandler
    BankCardCollectionsHandler --> Nats
    Nats --> BillingHandler
    BillingHandler --> Database
    BillingHandler --> Nats
    Nats --> ApiGateway
    ApiGateway --> ExternalService
    ApiGateway --> Database
```

- **External Service**: Initiates a collection request through the API Gateway
- **Api Gateway**: Receives the transaction, publishes it to Nats with a `New` subject, and saves the transaction in the database
- **Nats**: Publishes the transaction to the AML Service
- **AML Service**: Performs real-time sanction screening and publishes the transaction to Nats with a `Compliance Checked` subject
- **Bank Card Collections Handler**: Receives the message, pushes it to the Card Network for Authorization, and publishes the response to Nats with a `Processed` subject
- **Card Network**: Authorizes the transaction and sends a response back to the Bank Card Collections Handler
- **Billing Handler**: Receives the message, posts the transaction to the account statement, and publishes it to Nats
- **Api Gateway**: Receives the message, sends a callback request to the service, and updates the transaction in the database to completed
