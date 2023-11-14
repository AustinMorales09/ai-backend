from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import  OpenAI
from decouple import config
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, allowing requests from any origin

API_KEY = config('REACT_APP_KEY')
ORG = config('REACT_APP_ORG')

openai = OpenAI(
)

conversation = []


def add_message_to_conversation(role, content):
    conversation.append({'role': role, 'content': content})


@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_prompt = request.form.get('userPrompt')

    if user_prompt:
        add_message_to_conversation('user', user_prompt)

    if not conversation:
        add_message_to_conversation('system', 'You are a helpful assistant')

    try:
        result = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=conversation,
            temperature=0.5,
            max_tokens=2200
        )
        assistant_response = result.choices[0].message.content
        add_message_to_conversation('assistant', assistant_response)

        return jsonify({'assistantResponse': assistant_response})

    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred'})


if __name__ == '__main__':
    app.run(debug=True)
