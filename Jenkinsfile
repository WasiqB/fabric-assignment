pipeline {
    agent any
    triggers {
        githubPush() 
        cron('H 22 * * *')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-ssh-key', url: 'git@github.com:WasiqB/fabric-assignment.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'export PATH="/usr/local/bin:${PATH}"'
                sh 'export PATH=$HOME/bin:/usr/bin:$PATH'

                sh 'export PATH="/opt/homebrew/bin:${PATH}"'
                sh 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"'

                sh 'export NODE_PATH="/Users/wasiqbhamla/.nvm/versions/node/v22.21.1"'
                sh 'export NODE_HOME="$NODE_PATH/lib/node_modules"'

                sh 'pnpm install'
                sh 'pnpm exec playwright install --with-deps'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'CI=true pnpm test:ui'
            }
        }
        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report'
                ])
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
        }
    }
}