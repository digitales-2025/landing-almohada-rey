pipeline {
	agent any
	stages {
		stage('Build Nextjs static project') {
			agent {
				docker {
					image 'node:22'
					reuseNode true
          args '-u 0:0'
				}
			}
			environment {
				NEXT_PUBLIC_WHATSAPP_NUMBER="http://example.com"
				NEXT_PUBLIC_BASE_WHATSSAPP_URL="http://example.com"
			}
			steps {
				sh 'npm i -g pnpm'
				sh 'pnpm i'
				sh 'pnpm lint'
				sh 'pnpm run build'
			}
		}
	}
}
