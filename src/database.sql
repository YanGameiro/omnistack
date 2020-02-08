create table if not exists users (
	id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(320) NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE = InnoDB;

create table if not exists spots (
	id INT AUTO_INCREMENT NOT NULL,
    techs VARCHAR(360),
    owner_user_id INT NOT NULL,
    thumbnail_image_id INT NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    price DECIMAL(13,2) DEFAULT 0,
    PRIMARY KEY (`id`),
    CONSTRAINT fk_id_users_spots FOREIGN KEY (owner_user_id) REFERENCES users(id)
)ENGINE = InnoDB;

create table if not exists bookings (
	id INT NOT NULL AUTO_INCREMENT,
    requested_date VARCHAR(100) NOT NULL,
    approved BOOLEAN,
    interested_user_id INT NOT NULL,
    wanted_spot_id INT NOT NULL,
    CONSTRAINT fk_id_bookings_users FOREIGN KEY (interested_user_id) REFERENCES users(id),
    CONSTRAINT fk_id_bookings_spots FOREIGN KEY (wanted_spot_id) REFERENCES spots(id),
    PRIMARY KEY (id)
)ENGINE = InnoDB;
	
create table if not exists files (
	id INT NOT NULL AUTO_INCREMENT,
    `file` VARCHAR(300),
    PRIMARY KEY (id)
) ENGINE = InnoDB;

