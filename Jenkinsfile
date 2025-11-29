pipeline {
    agent any
    tools {
        nodejs 'System_NodeJS' 
    }
    triggers {
        githubPush() 
        cron('H 22 * * *')
    }
    environment {
        PATH = "/usr/local/bin:$HOME/bin:/usr/bin:/opt/homebrew/bin:/opt/homebrew/opt/ruby/bin:$PATH"

        NODE_PATH = "/Users/wasiqbhamla/.nvm/versions/node/v22.21.1"
        NODE_HOME = "$NODE_PATH/lib/node_modules"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-ssh-key', url: 'git@github.com:WasiqB/fabric-assignment.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'pnpm install'
                sh 'pnpm exec playwright install --with-deps'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'CI=true pnpm test:ui'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
        }
    }
}