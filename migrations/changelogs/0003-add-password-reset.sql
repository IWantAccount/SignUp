CREATE TABLE passwd_req (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    "used" boolean NOT NULL,
    "user_id" UUID NOT NULL,
    CONSTRAINT "passwd_req_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "passwd_req"
 ADD CONSTRAINT "fk_passwdreq_user" FOREIGN KEY (user_id)
    REFERENCES "signup_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;