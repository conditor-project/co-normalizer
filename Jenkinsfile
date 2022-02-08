pipeline {
  agent {
    docker {
      args '-e http_proxy -e https_proxy -e no_proxy'
      image 'node:12.16.3-alpine'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Audit') {
      steps {
        sh 'npm audit --audit-level=critical'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

  }
  environment {
    http_proxy = 'http://proxyout.inist.fr:8080'
    https_proxy = 'http://proxyout.inist.fr:8080'
  }
}