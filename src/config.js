export default {
    s3: {
        REGION: "us-east-2",
        BUCKET: "notes-app-upload-jorovipe"
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://dg28tziy2h.execute-api.us-east-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "us-east-2",
        USER_POOL_ID: "us-east-2_WwKpeSjs2",
        APP_CLIENT_ID: "4kceqhv1ec4ihedjo5261frg52",
        IDENTITY_POOL_ID: "us-east-2:1a23f59b-e32b-4a7e-ab5e-245b3d00c7c4"
    },
    MAX_ATTACHMENT_SIZE: 5000000, // 5 mb
    STRIPE_KEY: "pk_test_HdfvqGkAAUOc1AOhwL9TNZPJ00qLgpsK3X",
};