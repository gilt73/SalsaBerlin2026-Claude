"use client";

// IndexedDB-backed persistence (via idb-keyval) for the two things that
// don't belong in localStorage: the growing expenses ledger and any
// binary files (boarding pass PDFs) the user wants available offline.
//
// NOTE: everything shares ONE idb-keyval store ("data" inside the
// "salsa-berlin-2026" database) with prefixed keys. idb-keyval's
// createStore() opens the database unversioned per call — if you declare
// two separate object stores at module load, only the first one to open
// actually gets created (the second finds the DB already at version 1
// and no `onupgradeneeded` fires again). Prefixed keys in a single store
// sidestep that trap entirely.
import { createStore, get, set, del, keys } from "idb-keyval";
import { Expense } from "./types";

const store = createStore("salsa-berlin-2026", "data");

const EXPENSES_KEY = "expenses-list";

export async function loadExpenses(): Promise<Expense[]> {
  const list = await get<Expense[]>(EXPENSES_KEY, store);
  return list ?? [];
}

export async function saveExpenses(list: Expense[]): Promise<void> {
  await set(EXPENSES_KEY, list, store);
}

// --- Boarding pass / trip document blobs -----------------------------

export type StoredFile = {
  name: string;
  type: string;
  blob: Blob;
  savedAt: number;
};

const filePrefix = (key: string) => `file:${key}`;

export async function saveFile(key: string, file: File): Promise<void> {
  const stored: StoredFile = {
    name: file.name,
    type: file.type,
    blob: file,
    savedAt: Date.now(),
  };
  await set(filePrefix(key), stored, store);
}

export async function getFile(key: string): Promise<StoredFile | undefined> {
  return get<StoredFile>(filePrefix(key), store);
}

export async function deleteFile(key: string): Promise<void> {
  await del(filePrefix(key), store);
}

export async function listFileKeys(): Promise<string[]> {
  const all = (await keys(store)) as string[];
  return all.filter((k) => k.startsWith("file:")).map((k) => k.slice(5));
}
