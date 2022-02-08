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
        sh 'echo "First, npm audit..."'
        sh 'npm audit --audit-level=critical'

        sh 'echo "then dependencyCheck..."'
        dependencyCheck additionalArguments: '--proxyserver proxyout.inist.fr --proxyport 8080 --enableExperimental --prettyPrint', odcInstallation: '6.5.3'

        dependencyCheckPublisher 
            pattern: 'dependency-check-report.xml',
            failedTotalCritical: 3,
            failedTotalMedium: 7
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