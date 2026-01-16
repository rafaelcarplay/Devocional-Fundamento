
import React from 'react';
import { Devotion, Badge, MinistryEvent } from './types';

export const INITIAL_DEVOTIONS: Devotion[] = [
  {
    id: 1,
    week: 1,
    theme: "Afinados no Espírito",
    reference: "Colossenses 3:23",
    reflection: "Louvor excelente não é perfeição, é dedicação constante. Deus se agrada quando usamos nossos dons com preparo, humildade e alegria — mesmo quando o metrônomo parece nos julgar.",
    application: "Prepare-se melhor do que acha necessário esta semana. Dedique tempo extra ao seu instrumento como uma oferta.",
    prayer: "Senhor, recebe meu esforço como adoração. Que meu som seja reflexo da Tua glória. Amém.",
    challenge: "Ensaiar a parte mais difícil com metrônomo por 15 minutos extras."
  },
  {
    id: 2,
    week: 2,
    theme: "Excelência honra a Deus",
    reference: "1 Crônicas 25:7",
    reflection: "A bíblia cita músicos 'instruídos e peritos'. O talento é dom, mas a perícia é fruto de disciplina. Honrar a Deus é dar o melhor que temos, não o que sobra.",
    application: "Identifique um ponto fraco na sua técnica e estude-o com paciência esta semana.",
    prayer: "Pai, ajuda-me a buscar a excelência sem cair na vaidade. Que meu progresso te glorifique. Amém.",
    challenge: "Chegar 10 minutos antes do próximo ensaio para aquecer."
  },
  {
    id: 3,
    week: 3,
    theme: "Ensaiar também é oração",
    reference: "Salmo 33:3",
    reflection: "Muitas vezes separamos o 'espiritual' do 'técnico'. No louvor, o ensaio é o altar onde preparamos o sacrifício. Tocar bem permite que a igreja se concentre em Deus.",
    application: "Transforme seu momento de estudo individual em um momento de adoração secreta.",
    prayer: "Senhor, que cada nota que eu praticar hoje seja uma oração silenciosa. Amém.",
    challenge: "Orar pelo ministério antes de começar seu estudo individual."
  },
  {
    id: 4,
    week: 4,
    theme: "Menos ego, mais serviço",
    reference: "Filipenses 2:3",
    reflection: "No palco, o perigo é querer ser visto. No ministério, o objetivo é ser transparente para que Cristo apareça. O melhor solo é aquele que serve à canção e à congregação.",
    application: "No próximo ensaio, elogie sinceramente o progresso de um colega de banda.",
    prayer: "Jesus, diminui o meu eu para que Tu cresças. Que meu som abra caminho para a Tua presença. Amém.",
    challenge: "Ouvir com atenção o que o outro músico está tocando e ajustar seu volume."
  }
];

export const INITIAL_EVENTS: MinistryEvent[] = [
  {
    id: 1,
    title: "Ensaio Geral - Banda e Vocal",
    date: "2024-05-18",
    time: "19:30",
    location: "Auditório Principal",
    type: "rehearsal",
    description: "Preparação para a conferência de jovens. Levar as cifras impressas ou no tablet."
  },
  {
    id: 2,
    title: "Culto de Celebração",
    date: "2024-05-19",
    time: "18:00",
    location: "Templo",
    type: "service",
    description: "Check-in dos músicos às 17h00 para passagem de som."
  },
  {
    id: 3,
    title: "Reunião de Alinhamento Espiritual",
    date: "2024-05-22",
    time: "20:00",
    location: "Sala de Reuniões",
    type: "meeting",
    description: "Momento de oração e leitura da palavra exclusiva para o ministério."
  }
];

export const BADGES: Badge[] = [
  {
    id: 'constancy',
    name: 'Constância',
    description: 'Concluiu 4 semanas seguidas de devocional.',
    icon: 'fa-calendar-check',
    requirement: 4
  },
  {
    id: 'faithful-servant',
    name: 'Servo Fiel',
    description: 'Concluiu 12 semanas no total.',
    icon: 'fa-heart',
    requirement: 12
  },
  {
    id: 'excellence',
    name: 'Excelência',
    description: 'Concluiu 24 semanas no total.',
    icon: 'fa-medal',
    requirement: 24
  },
  {
    id: 'unity',
    name: 'Unidade',
    description: 'Participou do progresso coletivo do grupo.',
    icon: 'fa-users',
    requirement: 1
  }
];

export const MOTIVATIONAL_PHRASES = [
  "Bom trabalho, servo bom e fiel!",
  "Sua dedicação edifica o corpo de Cristo.",
  "O louvor começa no secreto.",
  "Continue firme, o Senhor se agrada do seu coração.",
  "Excelente! Sua constância é um testemunho.",
  "Deus vê seu esforço nos detalhes."
];
