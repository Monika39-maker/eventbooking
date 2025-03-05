pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-docker-registry'  // Replace with your Docker registry
        APP_NAME = 'eventbooking'
        DOCKER_CREDENTIALS = 'docker-credentials-id'  // Configure this in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Frontend Tests') {
                    steps {
                        sh 'npm test -- --watchAll=false'
                    }
                }
                stage('Backend Tests') {
                    steps {
                        dir('Backend') {
                            sh 'npm test'
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Frontend
                    docker.build("${DOCKER_REGISTRY}/${APP_NAME}-frontend:${BUILD_NUMBER}", "-f Dockerfile .")
                    
                    // Build Backend
                    docker.build("${DOCKER_REGISTRY}/${APP_NAME}-backend:${BUILD_NUMBER}", "-f Backend/Dockerfile ./Backend")
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS) {
                        docker.image("${DOCKER_REGISTRY}/${APP_NAME}-frontend:${BUILD_NUMBER}").push()
                        docker.image("${DOCKER_REGISTRY}/${APP_NAME}-frontend:${BUILD_NUMBER}").push('latest')
                        
                        docker.image("${DOCKER_REGISTRY}/${APP_NAME}-backend:${BUILD_NUMBER}").push()
                        docker.image("${DOCKER_REGISTRY}/${APP_NAME}-backend:${BUILD_NUMBER}").push('latest')
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml down || true'
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
