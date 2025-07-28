from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/shopping', methods=['GET'])
def shopping():
    search_query = request.args.get('search')
    return render_template('shopping.html', search=search_query)

@app.route('/service')
def service():
    return render_template("service.html")

@app.route('/contact')
def contact():
    return render_template("contact.html")

@app.route('/chatbot', strict_slashes=False)
def chatbot():
    return render_template("chatbot.html")

