create table tipos (
   codigo serial not null primary key, 
   nome varchar (20) not null,
   tarifa numeric (10,2) not null
);

create table locais (
   codigo serial not null primary key, 
   nome varchar (20) not null,
   localizacao varchar (20) not null
);

create table veiculos (
   id serial not null primary key, 
   tipo integer not null references tipos (codigo),
   placa varchar (7) not null,
   check (
    placa ~ '^[A-Z]{3}[0-9]{4}$' 
    or 
    placa ~ '^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$'
    ),
   cor varchar (20) not null
);

create table passagens (
   id serial not null primary key, 
   veiculo integer not null references veiculos (id),
   local integer not null references locais (codigo),
   data_hora timestamp not null default current_timestamp,
   valor numeric (10,2) not null,
   pago boolean not null default false
);

create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
   cpf varchar(11) not null,
	telefone varchar(14)  not null, 
	nome varchar(50) not null,
   tipo CHAR(1) not null DEFAULT 'c' CHECK (tipo IN ('c', 'a')) -- comum ou administrador
);