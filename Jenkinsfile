pipeline {
    agent {
        docker { image 'node:12.16.3-alpine' }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}