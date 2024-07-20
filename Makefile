build:
	docker-compose build geetest-demo-build

run: build clean-container
	docker-compose up -d geetest-demo-run

clean-container:
	# stop and remove useless containers
	docker-compose down --remove-orphans