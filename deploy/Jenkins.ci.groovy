pipeline {
	agent {
		docker {
			image 'guergeiro/pnpm:22-10-alpine'
			reuseNode true
			args '-u 0:0 -v /home/jenkinsci/pnpm-store:/root/.pnpm-store'
		}
	}
	environment {
		NEXT_PUBLIC_WHATSAPP_NUMBER="http://example.com"
		NEXT_PUBLIC_BASE_WHATSSAPP_URL="http://example.com"
	}
	stages {
		stage('Install dependencies') {
			steps {
				sh 'pnpm config set store-dir /root/.pnpm-store'
				sh 'pnpm i --frozen-lockfile'
			}
		}
		stage('Build Nextjs static project') {
			steps {
				sh 'pnpm check'
				sh 'pnpm lint'
				sh 'pnpm run build'
			}
		}
	}
	post {
		always {
			sh 'rm -rf node_modules'
		}
	}
}
