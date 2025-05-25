# 🌳 Task Manager – Docker + Kubernetes Fullstack Project

## Overview

This project is a simple fullstack Task Manager web application, designed to demonstrate practical DevOps workflows using Docker and Kubernetes.

- **Frontend:** React (basic, no Tailwind CSS)
- **Backend:** Node.js + Express (no authentication)
- **Database:** MongoDB
- **Containerization:** Docker (multi-service setup)
- **Orchestration:** Kubernetes (K8s)
- **Image Registry:** Docker Hub

---

## Features

- Create, update, and delete tasks
- Simple user interface
- Clear codebase for learning and demonstration
- Infrastructure-as-code: everything reproducible via YAML and Dockerfiles

---

## 📦 Folder Structure

task-manager-docker-k8s/
├── task-manager-frontend/ # React app
│ └── Dockerfile
├── task-manager-backend/ # Node.js/Express API
│ └── Dockerfile
├── k8s/ # Kubernetes YAML manifests
│ ├── backend-deployment.yaml
│ ├── backend-service.yaml
│ ├── frontend-deployment.yaml
│ ├── frontend-service.yaml
│ ├── mongo-deployment.yaml
│ └── mongo-service.yaml
├── docker-compose.yml # Local Docker Compose for dev/testing
└── README.md


---

## 🚀 Local Development with Docker Compose

> **Quickly spin up everything for local testing.**

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   
2. Access the app:

Frontend: http://localhost:3000

Backend: http://localhost:5000

🐳 Docker Image Build & Push
Log in to Docker Hub:

bash

docker login
Build images:

bash

docker build -t YOUR_DOCKERHUB/task-backend ./task-manager-backend
docker build -t YOUR_DOCKERHUB/task-frontend ./task-manager-frontend
Push to Docker Hub:

bash

docker push YOUR_DOCKERHUB/task-backend
docker push YOUR_DOCKERHUB/task-frontend
☸️ Kubernetes Deployment

1. Pre-requisites
Docker Desktop with Kubernetes enabled
kubectl

2. Update Image Names
In each *-deployment.yaml, set the correct image (from Docker Hub):

yaml

image: YOUR_DOCKERHUB/task-backend
image: YOUR_DOCKERHUB/task-frontend

3. Apply Kubernetes Manifests

bash
kubectl apply -f k8s/

4. Check Running Resources
bash

kubectl get pods
kubectl get svc

5. Access the Application
Find the NodePort for frontend-service:
bash
kubectl get svc frontend-service

Open in browser:

arduino
http://localhost:<NodePort>

Created by vizzko
