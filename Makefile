setup:
	@echo "Checking and setting Node.js version $(NODE_VERSION)..."
	@if ! command -v nvm >/dev/null 2>&1; then \
		echo "❌ NVM not found! Please install it first: https://github.com/nvm-sh/nvm"; \
		exit 1; \
	fi
	. ~/.nvm/nvm.sh && nvm install $(NODE_VERSION) && nvm use $(NODE_VERSION)
	@echo "✅ Node.js version switched to $(NODE_VERSION)"
	npm install

start:
	npm run dev

build:
	npm run build

clean:
	rm -rf node_modules package-lock.json
	npm cache clean --force
	npm install