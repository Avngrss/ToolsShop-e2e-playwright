// Jenkinsfile
pipeline {
    agent any

    tools {
        nodejs "NodeJS-24" 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate'
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
                body: """
                    <p>Тесты прошли успешно!</p>
                    <p><a href='${env.BUILD_URL}allure/'>🔗 Посмотреть Allure-отчёт</a></p>
                    <p>Branch: ${env.GIT_BRANCH}</p>
                """,
                mimeType: 'text/html',
                to: 'you@gmail.com' 
            )
        }

        failure {
            emailext (
                subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Тесты упали!</p>
                    <p><a href='${env.BUILD_URL}allure/'>🔗 Посмотреть Allure-отчёт</a></p>
                    <p><a href='${env.BUILD_URL}console'>📄 Логи сборки</a></p>
                """,
                mimeType: 'text/html',
                to: 'you@gmail.com' 
            )
        }
    }
}