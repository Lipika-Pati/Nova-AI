from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)

# CORS ENABLE
CORS(app)

# Groq API Key
client = Groq(
    client = Groq(api_key="gsk_xxxxx")
)




@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    user_message = data["message"]

    try:

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",
                    "content": "You are a smart AI assistant. The user's name is Lipika. Whenever the user says hi or hello, greet them warmly by saying Hi Lipika 👋"
                },

                {
                    "role": "user",
                    "content": user_message
                }

            ]

        )

        ai_reply = completion.choices[0].message.content

    except Exception as e:

        ai_reply = str(e)

    return jsonify({
        "reply": ai_reply
    })

if __name__ == "__main__":
    app.run(debug=True)