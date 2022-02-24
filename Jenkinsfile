pipeline {
  agent {
    docker {
      image 'node:12.16.3-alpine'
      args '-e http_proxy -e https_proxy -e no_proxy'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
        sh 'apk --no-cache add openjdk11 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community'
      }
    }

    stage('Audit') {
      steps {
        sh 'echo "First, npm audit..."'
        sh 'npm audit --audit-level=critical'
        sh 'echo "then dependencyCheck..."'
        sh 'rm -f /var/jenkins_home/tools/org.jenkinsci.plugins.DependencyCheck.tools.DependencyCheckInstallation/6.5.3/data/odc.update.lock'
        dependencyCheck(additionalArguments: '--purge --proxyserver proxyout.inist.fr --proxyport 8080 --enableExperimental --prettyPrint', odcInstallation: '6.5.3')
        dependencyCheck(additionalArguments: '--proxyserver proxyout.inist.fr --proxyport 8080 --enableExperimental --prettyPrint', odcInstallation: '6.5.3')
        dependencyCheckPublisher(pattern: 'dependency-check-report.xml', failedTotalCritical: 3, failedTotalMedium: 7)
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
    JAVA_HOME = '/opt/openjdk-11'
    JAVA_OPTS = '-Dhttp.proxyHost=proxyout.inist.fr -Dhttp.proxyPort=8080 -Dhttps.proxyHost=proxyout.inist.fr -Dhttps.proxyPort=8080'
  }
}