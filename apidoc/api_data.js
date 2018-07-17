define({ "api": [
  {
    "type": "get",
    "url": "/login",
    "title": "Authentication",
    "group": "General",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"username\":\"any-username\",\n   \"password\":\"any-password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"accessToken\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...\",\n   \"expiresIn\": 1531936602893,\n   \"tokenType\": \"bearer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/index.js",
    "groupTitle": "General",
    "name": "GetLogin"
  }
] });
