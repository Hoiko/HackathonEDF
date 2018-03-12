install:
	@echo "Install Api & Frontend"
	@./node_modules/.bin/concurrently "cd frontend && npm install" "cd api && php bin/console composer install"


run:
	@echo "All apps started and running"
	@echo "  API:          http://localhost:3000"
	@echo "  FRONTEND:     http://localhost:8080"
	@./node_modules/.bin/concurrently "cd frontend && npm start" "cd api && php bin/console server:start"
