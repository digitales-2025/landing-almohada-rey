pipeline {
    agent any
    environment {
        PROJECT_NAME = "almohada"
        PROJECT_SERVICE = "landing"
        PROJECT_STAGE = "develop"
        PROJECT_TRIPLET = "${PROJECT_NAME}-${PROJECT_SERVICE}-${PROJECT_STAGE}"

        REMOTE_USER = "docker_admin"
        REMOTE_IP = "116.203.105.37"
        REMOTE_FOLDER = "/opt/docker/compose/projects/${PROJECT_NAME}-${PROJECT_STAGE}"

        REGISTRY_CREDENTIALS = "dockerhub-digitalesacide-credentials"
        REGISTRY_URL = "docker.io"
        REGISTRY_USER = "digitalesacide"
        REGISTRY_REPO = "${PROJECT_TRIPLET}"
        FULL_REGISTRY_URL = "${REGISTRY_URL}/${REGISTRY_USER}/${REGISTRY_REPO}"
        ESCAPED_REGISTRY_URL = "${REGISTRY_URL}\\/${REGISTRY_USER}\\/${REGISTRY_REPO}"

        SSH_COM = "ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_IP}"
        SSH_CRED = "ssh-id_docker_admin"

        // Hash for this build
        NEXT_PUBLIC_WHATSAPP_NUMBER="+51958959958"
        NEXT_PUBLIC_BASE_WHATSSAPP_URL="https://api.whatsapp.com/send"
    }
    stages {
        stage("Build & push image") {
            steps {
                script {
                    withDockerRegistry(credentialsId: "${REGISTRY_CREDENTIALS}") {
                        def image = docker.build("${FULL_REGISTRY_URL}:${BUILD_NUMBER}", "--build-arg NEXT_PUBLIC_WHATSAPP_NUMBER=${NEXT_PUBLIC_WHATSAPP_NUMBER} --build-arg NEXT_PUBLIC_BASE_WHATSSAPP_URL=${NEXT_PUBLIC_BASE_WHATSSAPP_URL} -f deploy/Dockerfile.dev .")
                        image.push()
                        image.push("latest")
                    }
                }
            }
        }
        stage("Restart landing service") {
            steps {
                script {
                    def config = readYaml file: 'deploy/env.yaml'
                    def env = config.develop.landing

                    def nonSensitiveVars = env.nonsensitive.collect { k, v -> "${k}=${v}" }
                    def sensitiveVars = env.sensitive

                    def credentialsList = sensitiveVars.collect { 
                        string(credentialsId: it, variable: it)
                    }

                    withCredentials(credentialsList) {
                        sshagent([SSH_CRED]) {
                            // Create a temporary script that will create the .env file
                            // This enables us to use shell variables to properly handle 
                            // the credentials without using binding.getVariable()
                            sh """
                                cat > ${WORKSPACE}/create_env.sh << 'EOL'
#!/bin/bash
cat << EOF
# Non-sensitive variables
TEAMINNOVATION_LANDING_VERSION=${BUILD_REF}
${nonSensitiveVars.join('\n')}

# Sensitive variables
${sensitiveVars.collect { varName -> "${varName}=\${${varName}}" }.join('\n')}
EOF
EOL
                                chmod +x ${WORKSPACE}/create_env.sh
                            """

                            // Execute the script to generate env content and send it to remote
                            sh """
                                ${WORKSPACE}/create_env.sh | ${SSH_COM} 'umask 077 && cat > ${REMOTE_FOLDER}/.env.landing'
                            """

                            // populate & restart
                            sh """
                                ${SSH_COM} 'cd ${REMOTE_FOLDER} && \
                                docker pull ${FULL_REGISTRY_URL}:${BUILD_REF} && \
                                (rm .env || true) && \
                                touch .env.base && \
                                touch .env.backend && \
                                touch .env.frontend && \
                                cat .env.base >> .env && \
                                cat .env.backend >> .env && \
                                cat .env.frontend >> .env && \
                                docker compose up -d'
                            """
                        }
                    }
                }
            }
        }
    }
}
