---
title: Bank Card
---

**Bank Card Flow**

```mermaid
graph TD
    ExternalService --> ApiGateway
    ApiGateway --> Nats
    ApiGateway --> Database
    Nats --> AMLService
    AMLService --> Nats
    Nats --> MomoCollectionsHandler
    MomoCollectionsHandler --> Telco
    Telco --> MomoCollectionsHandler
    MomoCollectionsHandler --> Nats
    Nats --> BillingHandler
    BillingHandler --> Database
    BillingHandler --> Nats
    Nats --> ApiGateway
    ApiGateway --> ExternalService
    ApiGateway --> Database
```
