build:
	docker-compose build geetest-demo-build

run: build clean-container
	docker-compose up -d geetest-demo-run

lint:
	npm run lint

test:
	npm run test

clean-container:
	# stop and remove useless containers
	docker-compose down --remove-orphans
