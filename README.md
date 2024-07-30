# Vite React Project

## Introduction

This project is a React application built with Vite. It includes features such as user authentication by Twilio sms, generating and saving captions, and sharing them on social media.

## Installation

1. **Clone the Repository**
    ```bash
    git clone [Social Ideas](https://github.com/SatohJiro/social-ideals.git)
    cd to-your-repo
    ```

2. **Install Dependencies**
    Using npm:
    ```bash
    npm install
    ```
    Using yarn:
    ```bash
    yarn install
    ```
    
    Remeber to instal Vite
   
## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
VITE_NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000 (can change the port follow your backend port)
VITE_FACEBOOK_SHARE_URL=https://www.facebook.com/sharer/sharer.php
