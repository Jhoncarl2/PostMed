--
-- PostgreSQL database dump
--

\restrict QMKZOepa9X43YbvdpN0BHUrP6c0HKhV90TUhwzW21Ih6s1U8xD7waoysAuHo2Xe

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-01-23 15:59:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 16465)
-- Name: evaluaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evaluaciones (
    id integer NOT NULL,
    herida_id integer,
    fecha date DEFAULT CURRENT_DATE,
    largo_cm numeric(5,2),
    ancho_cm numeric(5,2),
    profundidad_cm numeric(5,2),
    notas text,
    url_imagen text,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.evaluaciones OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16464)
-- Name: evaluaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evaluaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evaluaciones_id_seq OWNER TO postgres;

--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 223
-- Name: evaluaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evaluaciones_id_seq OWNED BY public.evaluaciones.id;


--
-- TOC entry 222 (class 1259 OID 16449)
-- Name: heridas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.heridas (
    id integer NOT NULL,
    paciente_id integer,
    ubicacion character varying(255) NOT NULL,
    tipo character varying(100),
    estado character varying(50) DEFAULT 'Activo'::character varying,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.heridas OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16448)
-- Name: heridas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.heridas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.heridas_id_seq OWNER TO postgres;

--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 221
-- Name: heridas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.heridas_id_seq OWNED BY public.heridas.id;


--
-- TOC entry 220 (class 1259 OID 16436)
-- Name: pacientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pacientes (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100) NOT NULL,
    fecha_nacimiento date,
    contacto text,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.pacientes OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16435)
-- Name: pacientes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pacientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pacientes_id_seq OWNER TO postgres;

--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 219
-- Name: pacientes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pacientes_id_seq OWNED BY public.pacientes.id;


--
-- TOC entry 226 (class 1259 OID 16482)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(50) DEFAULT 'usuario'::character varying,
    creado_en timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16481)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 225
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4775 (class 2604 OID 16468)
-- Name: evaluaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluaciones ALTER COLUMN id SET DEFAULT nextval('public.evaluaciones_id_seq'::regclass);


--
-- TOC entry 4772 (class 2604 OID 16452)
-- Name: heridas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heridas ALTER COLUMN id SET DEFAULT nextval('public.heridas_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 16439)
-- Name: pacientes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes ALTER COLUMN id SET DEFAULT nextval('public.pacientes_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 16485)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4945 (class 0 OID 16465)
-- Dependencies: 224
-- Data for Name: evaluaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evaluaciones (id, herida_id, fecha, largo_cm, ancho_cm, profundidad_cm, notas, url_imagen, creado_en) FROM stdin;
\.


--
-- TOC entry 4943 (class 0 OID 16449)
-- Dependencies: 222
-- Data for Name: heridas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.heridas (id, paciente_id, ubicacion, tipo, estado, creado_en) FROM stdin;
\.


--
-- TOC entry 4941 (class 0 OID 16436)
-- Dependencies: 220
-- Data for Name: pacientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pacientes (id, nombre, apellido, fecha_nacimiento, contacto, creado_en) FROM stdin;
1	jhon	vasquez	2003-11-25	04245964990	2026-01-23 12:05:41.96018
\.


--
-- TOC entry 4947 (class 0 OID 16482)
-- Dependencies: 226
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password, rol, creado_en) FROM stdin;
1	Administrador	admin@postmed.com	123456	admin	2026-01-23 11:27:06.465485
\.


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 223
-- Name: evaluaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evaluaciones_id_seq', 1, false);


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 221
-- Name: heridas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.heridas_id_seq', 1, false);


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 219
-- Name: pacientes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pacientes_id_seq', 1, true);


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 225
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- TOC entry 4786 (class 2606 OID 16475)
-- Name: evaluaciones evaluaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT evaluaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 4784 (class 2606 OID 16458)
-- Name: heridas heridas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heridas
    ADD CONSTRAINT heridas_pkey PRIMARY KEY (id);


--
-- TOC entry 4782 (class 2606 OID 16447)
-- Name: pacientes pacientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pacientes
    ADD CONSTRAINT pacientes_pkey PRIMARY KEY (id);


--
-- TOC entry 4788 (class 2606 OID 16497)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4790 (class 2606 OID 16495)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4792 (class 2606 OID 16476)
-- Name: evaluaciones evaluaciones_herida_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evaluaciones
    ADD CONSTRAINT evaluaciones_herida_id_fkey FOREIGN KEY (herida_id) REFERENCES public.heridas(id) ON DELETE CASCADE;


--
-- TOC entry 4791 (class 2606 OID 16459)
-- Name: heridas heridas_paciente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.heridas
    ADD CONSTRAINT heridas_paciente_id_fkey FOREIGN KEY (paciente_id) REFERENCES public.pacientes(id) ON DELETE CASCADE;


-- Completed on 2026-01-23 15:59:39

--
-- PostgreSQL database dump complete
--

\unrestrict QMKZOepa9X43YbvdpN0BHUrP6c0HKhV90TUhwzW21Ih6s1U8xD7waoysAuHo2Xe

