-- liquibase formatted sql

-- changeset ondra:1773658848110-1 splitStatements:false
CREATE TABLE "sign_component" ("id" UUID NOT NULL, "text_description" VARCHAR(255) NOT NULL, "type" VARCHAR(255) NOT NULL, CONSTRAINT "sign_component_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-2 splitStatements:false
CREATE TABLE "sign" ("id" UUID NOT NULL, "explanation" VARCHAR(255), "language_level" VARCHAR(255), "region" VARCHAR(255), "asymmetric_sign" BOOLEAN, "both_hands_used" BOOLEAN, "type" VARCHAR(255) NOT NULL, "video_file_name" VARCHAR(255) NOT NULL, "category_id" UUID, "active_finger_orientation_id" UUID, "active_hand_shape_id" UUID, "active_palm_orientation_id" UUID, "location_component_id" UUID, "contact_component_id" UUID, "hand_arrangement_id" UUID, "movement_component_id" UUID, "passive_finger_orientation_id" UUID, "passive_hand_shape_id" UUID, "passive_palm_orientation_id" UUID, CONSTRAINT "sign_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-3 splitStatements:false
CREATE TABLE "signup_user" ("id" UUID NOT NULL, "name" VARCHAR(255) NOT NULL, "email" VARCHAR(255) NOT NULL, "password" VARCHAR(255) NOT NULL, "role" VARCHAR(255) NOT NULL, "classroom_id" UUID, CONSTRAINT "signup_user_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-4 splitStatements:false
ALTER TABLE "signup_user" ADD CONSTRAINT "uk6nd2xuop2xrgoawt4eu31vm20" UNIQUE ("email");

-- changeset ondra:1773658848110-5 splitStatements:false
CREATE TABLE "announcement" ("id" UUID NOT NULL, "content" VARCHAR(1000), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "title" VARCHAR(255), CONSTRAINT "announcement_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-6 splitStatements:false
CREATE TABLE "category" ("id" UUID NOT NULL, "name" VARCHAR(255) NOT NULL, "subject_id" UUID NOT NULL, CONSTRAINT "category_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-7 splitStatements:false
CREATE TABLE "classroom" ("id" UUID NOT NULL, "name" VARCHAR(255) NOT NULL, CONSTRAINT "classroom_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-8 splitStatements:false
CREATE TABLE "private_collection" ("id" UUID NOT NULL, "name" VARCHAR(255) NOT NULL, "user_id" UUID NOT NULL, CONSTRAINT "private_collection_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-9 splitStatements:false
CREATE TABLE "private_collection_sign" ("private_collection_id" UUID NOT NULL, "sign_id" UUID NOT NULL, CONSTRAINT "private_collection_sign_pkey" PRIMARY KEY ("private_collection_id", "sign_id"));

-- changeset ondra:1773658848110-10 splitStatements:false
CREATE TABLE "sign_translations" ("sign_id" UUID NOT NULL, "translations" VARCHAR(255));

-- changeset ondra:1773658848110-11 splitStatements:false
CREATE TABLE "subject" ("id" UUID NOT NULL, "name" VARCHAR(255) NOT NULL, CONSTRAINT "subject_pkey" PRIMARY KEY ("id"));

-- changeset ondra:1773658848110-12 splitStatements:false
CREATE TABLE "subject_student" ("subject_id" UUID NOT NULL, "student_id" UUID NOT NULL, CONSTRAINT "subject_student_pkey" PRIMARY KEY ("subject_id", "student_id"));

-- changeset ondra:1773658848110-13 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fk3k7egc31o6uwvs4x2ntmdjohn" FOREIGN KEY ("active_finger_orientation_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-14 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fk5cve2uv13b7b1qegt7iqm4ffp" FOREIGN KEY ("active_hand_shape_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-15 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fk5hnp8vj22rygqnbkw2byjmi4i" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-16 splitStatements:false
ALTER TABLE "private_collection_sign" ADD CONSTRAINT "fk5rgbo1nu2ppigwrtoxjflq09y" FOREIGN KEY ("sign_id") REFERENCES "sign" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-17 splitStatements:false
ALTER TABLE "private_collection_sign" ADD CONSTRAINT "fk97k3vvlhht6xwwsnk3sdaajak" FOREIGN KEY ("private_collection_id") REFERENCES "private_collection" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-18 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fka25gkr6xxq525h1r0ajq974lt" FOREIGN KEY ("movement_component_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-19 splitStatements:false
ALTER TABLE "subject_student" ADD CONSTRAINT "fkaofq137ktpj28dariq084g0w1" FOREIGN KEY ("subject_id") REFERENCES "subject" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-20 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fkapf3iuptt04vn190o4v6p18d7" FOREIGN KEY ("location_component_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-21 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fkd4v1ckrl2i2qdavro5hj9qeiq" FOREIGN KEY ("contact_component_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-22 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fke28md82o65hvf2fwnntg8ciwy" FOREIGN KEY ("passive_hand_shape_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-23 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fkf1duv52ddpo881pt5xkg0b9au" FOREIGN KEY ("active_palm_orientation_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-24 splitStatements:false
ALTER TABLE "subject_student" ADD CONSTRAINT "fkininunraatdirw0bj4nl9ewh3" FOREIGN KEY ("student_id") REFERENCES "signup_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-25 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fkk6w6f5eaqp3uesvkkb9uhx5tc" FOREIGN KEY ("passive_finger_orientation_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-26 splitStatements:false
ALTER TABLE "signup_user" ADD CONSTRAINT "fkk7ibf3c08id8aeqi9lp4ghi9j" FOREIGN KEY ("classroom_id") REFERENCES "classroom" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-27 splitStatements:false
ALTER TABLE "category" ADD CONSTRAINT "fkmhc1l1kunbddi6y5x9vu10dpt" FOREIGN KEY ("subject_id") REFERENCES "subject" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-28 splitStatements:false
ALTER TABLE "sign_translations" ADD CONSTRAINT "fko97b8uvfgeqmiveey9syeg5nu" FOREIGN KEY ("sign_id") REFERENCES "sign" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-29 splitStatements:false
ALTER TABLE "private_collection" ADD CONSTRAINT "fkppcv592dno5e5fab9jq29xcky" FOREIGN KEY ("user_id") REFERENCES "signup_user" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-30 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fkq4jfegwv0wfac9hx33riqkstt" FOREIGN KEY ("passive_palm_orientation_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

-- changeset ondra:1773658848110-31 splitStatements:false
ALTER TABLE "sign" ADD CONSTRAINT "fksab6q1br4xufu4gtvsyw8ga96" FOREIGN KEY ("hand_arrangement_id") REFERENCES "sign_component" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

