-- CreateEnum
CREATE TYPE "JenisBibit" AS ENUM ('Sayuran', 'Buah');

-- CreateTable
CREATE TABLE "Lahan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
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
    "lahanId" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "LahanImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bibit" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "hargaBeli" TEXT NOT NULL,
    "jenis" "JenisBibit" NOT NULL,

    CONSTRAINT "Bibit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tanam" (
    "id" TEXT NOT NULL,
    "lahanId" TEXT NOT NULL,
    "bibitId" TEXT NOT NULL,
    "tanggalTanam" TIMESTAMP(3),
    "tanggalPanen" TIMESTAMP(3),
    "jumlahPanen" INTEGER NOT NULL,
    "hargaPanen" INTEGER NOT NULL,

    CONSTRAINT "Tanam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AktivitasTanam" (
    "id" TEXT NOT NULL,
    "tanamId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "pupuk" INTEGER NOT NULL,
    "tanggalAktivitas" TIMESTAMP(3),

    CONSTRAINT "AktivitasTanam_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Lahan" ADD CONSTRAINT "Lahan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LahanImage" ADD CONSTRAINT "LahanImage_lahanId_fkey" FOREIGN KEY ("lahanId") REFERENCES "Lahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tanam" ADD CONSTRAINT "Tanam_lahanId_fkey" FOREIGN KEY ("lahanId") REFERENCES "Lahan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tanam" ADD CONSTRAINT "Tanam_bibitId_fkey" FOREIGN KEY ("bibitId") REFERENCES "Bibit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AktivitasTanam" ADD CONSTRAINT "AktivitasTanam_tanamId_fkey" FOREIGN KEY ("tanamId") REFERENCES "Tanam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
