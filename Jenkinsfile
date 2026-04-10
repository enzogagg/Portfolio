pipeline {
    agent any

    triggers {
        // Triggered by the Generic Webhook Trigger plugin from Gitea Actions
        GenericTrigger(
            genericVariables: [
                [key: 'commit', value: '$.commit'],
                [key: 'ref', value: '$.ref']
            ],
            token: 'portfolio-deploy-token', // Matches secrets.JENKINS_TRIGGER_TOKEN if static
            causeString: 'Triggered by Gitea CI - Commit: $commit',
            printPostContent: true,
            silentResponse: false
        )
    }

    environment {
        GITHUB_CREDS = credentials('github-token')
        DOCKER_REGISTRY = "registry.ega.ovh"
        PROJECT_NAME = "portfolio"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Images') {
            steps {
                script {
                    sh "docker build -t ${PROJECT_NAME}-backend:${env.BUILD_NUMBER} ./backend"
                    sh "docker build -t ${PROJECT_NAME}-frontend:${env.BUILD_NUMBER} ./frontend"
                }
            }
        }

        stage('Deploy Local') {
            steps {
                sshAgent(['local-deploy-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no user@local-server "
                            cd /opt/infrastructure/portfolio &&
                            docker compose pull &&
                            docker compose up -d
                        "
                    '''
                }
            }
        }

        stage('Sync to GitHub') {
            steps {
                sh '''
                    git remote add github https://${GITHUB_CREDS}@github.com/enzo_gagg/Portfolio.git || true
                    git fetch origin
                    git push --mirror github
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ CD Pipeline (Deploy & Mirror) successful for commit ${commit}"
        }
    }
}
