from app import create_app
app = create_app()

# https://www.digitalocean.com/community/tutorials/how-to-structure-large-flask-applications
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8081, debug=True)