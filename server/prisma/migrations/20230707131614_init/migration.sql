-- CreateEnum
CREATE TYPE "JenisBibit" AS ENUM ('Sayuran', 'Buah');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "hashed_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lahan" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "luas" DECIMAL(65,30) NOT NULL,
    "alamat" TEXT NOT NULL,
    "lat" DECIMAL(65,30) NOT NULL,
    "lon" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Lahan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LahanImage" (
    "id" TEXT NOT NULL,
    "lahan_id" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "LahanImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bibit" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "harga_beli" TEXT NOT NULL,
    "jenis" "JenisBibit" NOT NULL,

    CONSTRAINT "Bibit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tanam" (
    "id" TEXT NOT NULL,
    "lahan_id" TEXT NOT NULL,
    "bibit_id" TEXT NOT NULL,
    "tanggal_tanam" TIMESTAMP(3),
    "tanggal_panen" TIMESTAMP(3),
    "jumlah_panen" INTEGER NOT NULL,
    "harga_panen" INTEGER NOT NULL,

    CONSTRAINT "Tanam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AktivitasTanam" (
    "id" TEXT NOT NULL,
    "tanam_id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "pupuk" INTEGER NOT NULL,
    "tanggal_aktivitas" TIMESTAMP(3),

    CONSTRAINT "AktivitasTanam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_id_key" ON "RefreshToken"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lahan_id_key" ON "Lahan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LahanImage_id_key" ON "LahanImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bibit_id_key" ON "Bibit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tanam_id_key" ON "Tanam"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AktivitasTanam_id_key" ON "AktivitasTanam"("id");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lahan" ADD CONSTRAINT "Lahan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LahanImage" ADD CONSTRAINT "LahanImage_lahan_id_fkey" FOREIGN KEY ("lahan_id") REFERENCES "Lahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tanam" ADD CONSTRAINT "Tanam_lahan_id_fkey" FOREIGN KEY ("lahan_id") REFERENCES "Lahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tanam" ADD CONSTRAINT "Tanam_bibit_id_fkey" FOREIGN KEY ("bibit_id") REFERENCES "Bibit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AktivitasTanam" ADD CONSTRAINT "AktivitasTanam_tanam_id_fkey" FOREIGN KEY ("tanam_id") REFERENCES "Tanam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
