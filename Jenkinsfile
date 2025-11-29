pipeline {
    agent any
    tools {
        nodejs 'Node22'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-ssh-key', url: 'git@github.com:WasiqB/fabric-assignment.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install -g pnpm'
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