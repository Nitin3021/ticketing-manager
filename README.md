# Ticketing manager

## Overview

Welcome to my personal project! This project is built upon the implementation of Microservices using Typescript to facilitate buying & selling Tickets. The term "tickets" refer to a general idea where it could be a movie ticket, concert ticket or it could be even a football/soccer game ticket! Customers can place order and pay using Stripe as a payment method. Once an order has been successfully paid/purchased, it would be visible in the purchase history. 

<ins>Work is still in progress and I would be happy to share more details upon the project completion!</ins>

## Features

- Account signup/login page for customers
- Ticket creation and setting up the price
- Customers can buy those tickets at the stated price
- Custom time out if the order is made but payment is pending
- Order cancellation
- Stripe payment method implementation
- Historical ticket purchase list display

## Usage

### Docker & Kubernetes

This project is using Docker & kubernetes for image, container and cluster creation respectively. Kubernetes onfiguration for each service implemented can be found in '/infra/' folder.

### Skaffold
skaffold.yaml file is available in the root of the project, this would enable to do the project development with ease.

### Workflow
CI/CD workflow configuration files can be found in '.github/workflows/' folder. DigitalOcean cloud services has been used to do run the project in Production. If there is a need to deploy this project then you must be aware of DigitalOcean configurations, especially related to running kubernetes in DigitalOcean. If another provider such as AWS or GCP needs to be used then such configurations must be done accordingly.

### Environment variables
Environment variables are defined as "secrets" in Kubernetes cluster. To run this project successfully, below environment variables must be set.
```
MONGO_URI = your mongodb uri
JWT_KEY = 'abc123'
NEXT_PUBLIC_STRIPE_PUB_KEY = your stripe client/public key
NATS_CLUSTER_ID = stan cluster id
NATS_CLIENT_ID = stan client id
NATS_URL = stan url
REDIS_HOST = your redis host
NODE_ENV = test
```

### Install Dependencies (frontend & backend)

```
# Go to each services folder & run below command:
npm install
```

### Run

```
# Build docker image
docker build -t 'your docker username'/'service name'
docker push 'your docker username'/'service name'

# Run image in Kubernetes
kubectl apply -f 'service name'.yaml

# If need to run through skaffold, then kindly go through skaffold installation and run below command from root of project
skaffold dev
```

## Build & Deploy

```
# Workflow configurations are available in './github/' folder. It will allow your to automatically run builds, tests and deploment to DigitalOcean. If another provider is needed then configure these files accordingly.
```

```
Sample User Logins

doejohn@example.com (Customer)
123456

smithjane@example.com (Customer)
123456
```

## License

The MIT License

Copyright (c) 2021 [MIT © NP](https://github.com/Nitin3021)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
