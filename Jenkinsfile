pipeline {
    agent any

    tools {
        nodejs "NodeJS-24"
        jdk "JDK"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
    }

    post {
        always {
            allure results: [[path: 'allure-results']]
        }
        success {
            emailext (
                subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "<p>Allure Report: <a href='${env.BUILD_URL}allure/'>link</a></p>",
                mimeType: 'text/html',
                to: 'yurkasedow0@gmail.com'
            )
        }
        failure {
            emailext (
                subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "<p>Allure Report: <a href='${env.BUILD_URL}allure/'>link</a></p>",
                mimeType: 'text/html',
                to: 'yurkasedow0@gmail.com'
            )
        }
    }
}