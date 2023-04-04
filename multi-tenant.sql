--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: article; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.article (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tenant_id uuid NOT NULL,
    text character varying NOT NULL
);


ALTER TABLE public.article OWNER TO "user";

--
-- Name: migration; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.migration (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migration OWNER TO "user";

--
-- Name: migration_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.migration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migration_id_seq OWNER TO "user";

--
-- Name: migration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.migration_id_seq OWNED BY public.migration.id;


--
-- Name: tenant; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.tenant (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.tenant OWNER TO "user";

--
-- Name: user; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO "user";

--
-- Name: user_tenants_tenant; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.user_tenants_tenant (
    user_id uuid NOT NULL,
    tenant_id uuid NOT NULL
);


ALTER TABLE public.user_tenants_tenant OWNER TO "user";

--
-- Name: migration id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.migration ALTER COLUMN id SET DEFAULT nextval('public.migration_id_seq'::regclass);


--
-- Data for Name: article; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.article (id, tenant_id, text) FROM stdin;
236b8679-80f5-4dc6-a3dc-2399ee159557	c81da32d-33fd-41bc-b782-4482cde3a2da	text of article 1 for Tenant 1
e342a316-ab38-411f-a846-b94aec880dc2	c81da32d-33fd-41bc-b782-4482cde3a2da	text of article 2 for Tenant 1
e536b827-14b5-496d-973e-9bac1271e2a8	f862d0b8-07ed-4bd6-be81-f5985322d0e3	text of article 1 for Tenant 2
29d97f03-363e-4b9d-a81a-bcc3a94daa8c	f862d0b8-07ed-4bd6-be81-f5985322d0e3	text of article 2 for Tenant 2
\.


--
-- Data for Name: migration; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.migration (id, "timestamp", name) FROM stdin;
3	1680556358506	Init1680556358506
4	1680620383116	Article1680620383116
\.


--
-- Data for Name: tenant; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.tenant (id, name) FROM stdin;
c81da32d-33fd-41bc-b782-4482cde3a2da	Tenant 1
f862d0b8-07ed-4bd6-be81-f5985322d0e3	Tenant 2
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."user" (id, email) FROM stdin;
6acb3a4f-5529-4faa-98fc-496fc836c4d7	rx.rasim@gmail.com
\.


--
-- Data for Name: user_tenants_tenant; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.user_tenants_tenant (user_id, tenant_id) FROM stdin;
6acb3a4f-5529-4faa-98fc-496fc836c4d7	c81da32d-33fd-41bc-b782-4482cde3a2da
6acb3a4f-5529-4faa-98fc-496fc836c4d7	f862d0b8-07ed-4bd6-be81-f5985322d0e3
\.


--
-- Name: migration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.migration_id_seq', 4, true);


--
-- Name: migration PK_3043fc6b8af7c99b8b98830094f; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.migration
    ADD CONSTRAINT "PK_3043fc6b8af7c99b8b98830094f" PRIMARY KEY (id);


--
-- Name: article PK_40808690eb7b915046558c0f81b; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user_tenants_tenant PK_d5850ffddf551ac62c842adb256; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_tenants_tenant
    ADD CONSTRAINT "PK_d5850ffddf551ac62c842adb256" PRIMARY KEY (user_id, tenant_id);


--
-- Name: tenant PK_da8c6efd67bb301e810e56ac139; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tenant
    ADD CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY (id);


--
-- Name: IDX_addccc8087051d43cca8549b09; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX "IDX_addccc8087051d43cca8549b09" ON public.user_tenants_tenant USING btree (tenant_id);


--
-- Name: IDX_da0536255eaf466042b73e82fb; Type: INDEX; Schema: public; Owner: user
--

CREATE INDEX "IDX_da0536255eaf466042b73e82fb" ON public.user_tenants_tenant USING btree (user_id);


--
-- Name: article FK_44b915ba570031cb54ac5e8d22b; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.article
    ADD CONSTRAINT "FK_44b915ba570031cb54ac5e8d22b" FOREIGN KEY (tenant_id) REFERENCES public.tenant(id);


--
-- Name: user_tenants_tenant FK_addccc8087051d43cca8549b09a; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_tenants_tenant
    ADD CONSTRAINT "FK_addccc8087051d43cca8549b09a" FOREIGN KEY (tenant_id) REFERENCES public.tenant(id);


--
-- Name: user_tenants_tenant FK_da0536255eaf466042b73e82fb5; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.user_tenants_tenant
    ADD CONSTRAINT "FK_da0536255eaf466042b73e82fb5" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

