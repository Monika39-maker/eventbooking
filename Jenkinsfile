pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test -- --ci --watchAll=false'
      }
    }
  }
  post {
    success {
      echo 'Tests passed!'
      // See next step for auto-merge
    }
    failure {
      echo 'Tests failed!'
    }
  }
}
