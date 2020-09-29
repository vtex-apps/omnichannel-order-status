# Organizations

Allows customers to view order status on standardized external APIs

## Usage

Access your url store in admin area:

https://{workspace--{accountname}.myvtex.com/admin

## In Account Settings (/admin)

- Go to My Apps -> B2B module
- Set informations (link endpoint, login and token) for communication with service.


### Master data schemas

<details><summary>Orders B2B</summary>

```

Data Entity Name: UserOrganization
Schema Name: user-organization-schema-v1

{
  "properties": {
    "endpoint": {
      "title": "Link api",
      "type": "string"
    },
    "user": {
      "title": "Login",
      "type": "string"
    },
    "token": {
      "title": "Token",
      "type": "string"
    }
  }
}

```
</details>
