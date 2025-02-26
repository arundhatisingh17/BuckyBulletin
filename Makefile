.PHONY: all check_git clean install

all:
	@echo "Starting events_calendar.py..."
	@nohup python3 events_calendar.py > events.log 2>&1 & \
		echo "Process started with PID $$!"

check_git:
	@while true; do \
		sleep 30; \
		if git status --porcelain | grep '^??' > /dev/null; then \
			echo "Untracked files detected. Committing and pushing changes..."; \
			git add .; \
			git commit -m "Auto commit untracked files"; \
			git push; \
		else \
			echo "No untracked files found. Checking again in 30 seconds..."; \
		fi; \
	done

install:
	pip install flask
	pip install selenium
	pip install python-dotenv
	pip install webdriver_manager
	pip install beautifulsoup4
	pip install googlemaps
	pip install schedule
	pip install flask_cors
	pip install --upgrade requests urllib3 chardet

clean:
	rm -rf __pycache__
