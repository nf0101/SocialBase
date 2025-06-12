# SocialBase

A full-stack MERN application that lets you **browse, filter and analyse social-media profiles and their activities**, highlighting differences between **legitimate** and **fake** accounts.

---
## 📑 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
---
## Project Overview
SocialBase nasce come progetto per l’esame di **Basi di Dati 2**. A partire dal dataset *[Fake Profile and Post Detection on Social Media](https://www.kaggle.com/datasets/biodoumoyegeorge/fake-profile-and-post-detection-on-social-media)* offre:

- End-point CRUD per le collection **Profiles** e **Activities**.
- Dashboard interattive che confrontano **fake vs legit** con grafici Recharts.
- Ricerca full-text, filtri avanzati e paginazione.

Back-end: **Express + Mongoose**. Front-end: **React**.

---
## Key Features
| Area | Dettagli |
|------|----------|
| Profiles | • Ricerca per `username`, `email`, `first_name`, `last_name`<br>• Filtri: private / verified / fake / completeness<br>• Aggiorna e cancella inline |
| Activities | • Lista paginata con **ActivityCard** espandibile<br>• Join `/activities/of-profile/:userId`<br>• Edit e delete inline |
| Statistics | • `ProfileStats.jsx`: pie tipo account, barre privacy, curve età/completeness, medie<br>• `ActivitiesStats.jsx`: pie content-type, barre weekday/weekend, line time-of-day |
| UX | Responsive, emoji, optimistic UI |

