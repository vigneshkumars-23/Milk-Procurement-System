insert into pincode values (600098,"chennai");
insert into pincode values (600044,"chennai");
insert into pincode values (600033,"chennai");


insert into login values ("ganeshsociety@gmail.com","Ganesh@12345","society");
insert into login values ("ragusociety@gmail.com","Ragu@12345","society");
insert into login values ("rajeshsociety@gmail.com","Rajesh@12345","society");
insert into login values ("rajsociety@gmail.com","Raj@12345","society");
insert into login values ("rakeshsociety@gmail.com","Rakesh@12345","society");
insert into login values ("rangasociety@gmail.com","Ranga@12345","society");
insert into login values ("ravisociety@gmail.com","Ravi@12345","society");

insert into login values ("arunchilling@gmail.com","Arun@12345","chillingsystem");
insert into login values ("karithichilling@gmail.com","Karthi@12345","chillingsystem");
insert into login values ("kumarchilling@gmail.com","Kumar@12345","chillingsystem");
insert into login values ("rameshchilling@gmail.com","Ramesh@12345","chillingsystem");
insert into login values ("vigneshchilling@gmail.com","Vignesh@12345","chillingsystem");
insert into login values ("vishalchilling@gmail.com","Vishal@12345","chillingsystem");


insert into login values ("rajfarmer@gmail.com","Raj@12345","farmer");
insert into login values ("sainath@gmail.com","Sainath@12345","farmer");
insert into login values ("sandeep@gmail.com","Sandeep@12345","farmer");
insert into login values ("sujan@gmail.com","Sujan@12345","farmer");
insert into login values ("suresh@gmail.com","Suresh@12345","farmer");

insert into login values ("aavinindustry@gmail.com","Aavin@12345","industry");
insert into login values ("amulindustry@gmail.com","Amul@12345","industry");
insert into login values ("hudsonindustry@gmail.com","Hudson@12345","industry");

insert into industry values (111111111111,"aavin","corporate limited","aavinindustry@gmail.com",50.00,60.00,"36-A","nandanam",600098);
insert into industry values (111111111112,"amul","private limited","amulindustry@gmail.com",55.00,65.00,"72-Z","nagapa nagar",600044);
insert into industry values (111111111113,"hudson","private limited","hudsonindustry@gmail.com",60.00,70.00,"86-B","pallavarram",600033);\

insert into chillingsystem values (222222222222,111111111111,"kumarchilling@gmail.com",45.00,55.00,"8/123","teyampet",600098);
insert into chillingsystem values (222222222223,111111111111,"arunchilling@gmail.com",45.00,55.00,"A-123","Adambakkam",600098);
insert into chillingsystem values (222222222224,111111111111,"karthichilling@gmail.com",45.00,55.00,"B-123","Alandur",600098);
insert into chillingsystem values (222222222225,111111111112,"kumarchilling@gmail.com",50.00,60.00,"C-123","Ayanavaram",600044);
insert into chillingsystem values (222222222226,111111111112,"rameshchilling@gmail.com",50.00,60.00,"D-123","Chetput",600044);
insert into chillingsystem values (222222222227,111111111113,"vigneshchilling@gmail.com",55.00,65.00,"E-123","Chitlapakkam",600033);
insert into chillingsystem values (222222222228,111111111113,"vishalchilling@gmail.com",55.00,65.00,"F-123","Chrompet",600033);

insert into society values (333333333333,222222222222,"ganeshsociety@gmail.com",40.00,45.00,"4/235","thambaram",600098);
insert into society values (333333333334,222222222223,"ragusociety@gmail.com",42.50,47.50,"4/235","Avadi",600098);
insert into society values (333333333335,222222222224,"rajeshsociety@gmail.com",42.53,47.45,"4/275","Chetput",600098);
insert into society values (333333333336,222222222225,"rajsociety@gmail.com",41.50,48.50,"5/235","Chitlapakkam",600044);
insert into society values (333333333337,222222222226,"rakeshsociety@gmail.com",44.50,46.50,"B/235","Choolai",600044);
insert into society values (333333333338,222222222227,"rangasociety@gmail.com",49.50,48.50,"C/235","Egmore",600033);
insert into society values (333333333339,222222222228,"ravisociety@gmail.com",46.50,41.50,"D/235","Ennore",600033);

insert into farmer values (444444444444,333333333333,"rajfarmer@gmail.com","Raj Pradeep","P","Male","2000-10-27","4/235","Thangavel Nagar",600098);
insert into farmer values (444444444445,333333333334,"sainathfarmer@gmail.com","Sainath","S","Male","2000-09-23","5/235","Guindy",600098);
insert into farmer values (444444444446,333333333335,"sandeepfarmer@gmail.com","Sandeep","R","Male","2000-10-12","8/235","George Town",600044);
insert into farmer values (444444444447,333333333336,"sujanfarmer@gmail.com","Sujan","M","Male","2000-06-11","1/235","ICF",600033);
insert into farmer values (444444444448,333333333337,"sureshfarmer@gmail.com","Suresh","N","Male","2000-10-07","7/235","Kattivakkam",600033);


insert into testPhase values(1, '2020-11-12','05:30:32', 444444444444, 333333333333);
insert into testPhase values(2, '2020-11-12','05:45:22', 444444444445, 333333333334);
insert into testPhase values(3, '2020-11-12','05:47:05', 444444444448, 333333333338);
insert into testPhase values(4, '2020-11-12','05:49:36', 444444444446, 333333333335);
insert into testPhase values(5, '2020-11-12','05:59:10', 444444444447, 333333333337);

insert into testPhase values(101, '2020-11-12','08:02:39', 333333333333, 222222222228);
insert into testPhase values(102, '2020-11-12','08:03:32', 333333333334, 222222222225);
insert into testPhase values(103, '2020-11-12','08:04:22', 333333333338, 222222222222);
insert into testPhase values(104, '2020-11-12','08:06:12', 333333333335, 222222222226);
insert into testPhase values(105, '2020-11-12','08:09:02', 333333333337, 222222222225);

insert into testPhase values(1001, '2020-11-12','09:05:02', 222222222225, 111111111111);
insert into testPhase values(1002, '2020-11-12','09:05:11', 222222222222, 111111111111);
insert into testPhase values(1003, '2020-11-12','09:06:45', 222222222226, 111111111112);
insert into testPhase values(1004, '2020-11-12','09:08:33', 222222222228, 111111111113);

insert into rate values(1, 4, 0, 3.5, 0);
insert into rate values(2, 3.56, 1.5, 3.25, 7.15);
insert into rate values(3, 3.8, 0, 3.09, 0);
insert into rate values(4, 3.77, 1.35, 3.7, 7.02);
insert into rate values(5, 3.62, 0, 3.88, 0);

insert into rate values(101, 4, 0, 3.5, 0);
insert into rate values(102, 3.56, 1.5, 3.25, 7.15);
insert into rate values(103, 3.8, 0, 3.09, 0);
insert into rate values(104, 3.77, 1.35, 3.7, 7.02);
insert into rate values(105, 3.62, 0, 3.88, 0);

insert into rate values(1001, 7.18, 1.5, 3.565, 7.15);
insert into rate values(1002, 3.8, 0, 3.09, 0);
insert into rate values(1003, 3.77, 1.35, 3.7, 7.02);
insert into rate values(1004, 4, 0, 3.5, 0);
 