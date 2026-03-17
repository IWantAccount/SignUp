--changeset ondra:0002-add-invite
CREATE TABLE invite (
    "id" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "used_at" TIMESTAMP WITH TIME ZONE,
    "created_user_id" UUID,
    CONSTRAINT "invite_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "invite_user_unique" UNIQUE ("created_user_id")
);

ALTER TABLE "invite"
    ADD CONSTRAINT "fk_invite_user" FOREIGN KEY ("created_user_id")
        REFERENCES "signup_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;