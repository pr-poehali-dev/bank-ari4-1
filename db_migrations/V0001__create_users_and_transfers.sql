
CREATE TABLE t_p20768741_bank_ari4_1.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  balance NUMERIC(12, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p20768741_bank_ari4_1.transfers (
  id SERIAL PRIMARY KEY,
  from_phone VARCHAR(20) NOT NULL,
  to_phone VARCHAR(20) NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  comment VARCHAR(255),
  status VARCHAR(20) NOT NULL DEFAULT 'success',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p20768741_bank_ari4_1.users (name, phone, balance) VALUES
  ('Арина Кузнецова', '+79991234567', 42850.00),
  ('Алексей Петров', '+79991234568', 15200.00),
  ('Мария Соколова', '+79269876543', 8400.00),
  ('Дмитрий Козлов', '+79165554433', 31000.00),
  ('Катя Василенко', '+79031112233', 5600.00);
