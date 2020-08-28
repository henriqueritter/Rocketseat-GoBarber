import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import DayPicker, { DayModifiers, ModifiersUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { FiPower, FiClock } from 'react-icons/fi';
import { boolean } from 'yup';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  //para deslogar
  const { signOut, user } = useAuth();

  //esta associado aos apontamenetos da esquerda
  const [selectedDate, setSelectedDate] = useState(new Date());
  //quando usuario trocar de mes deve retornar os dias disponivesl pro mes
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  //pega dias indisponiveis
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth(); //nao precisa passar o +1 aqui pois esta criando abaixo
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"></img>

          <Profile>
            <img src={user.avatar_url} alt={user.name}></img>
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>

        <Content>
          <Schedule>
            <h1>Horarios agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 6</span>
              <span>segunda-feira</span>
            </p>

            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/36273680?s=460&u=e59c95a5c92f108ee2c013335fa8de23893f6516&v=4"
                  alt="Cliente"
                />
                <strong>Cliente henique</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>

            <Section>
              <strong>Manhã</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>
                <div>
                  <img
                    src="https://avatars1.githubusercontent.com/u/36273680?s=460&u=e59c95a5c92f108ee2c013335fa8de23893f6516&v=4"
                    alt="Cliente"
                  />
                  <strong>Cliente Henrq</strong>
                </div>
              </Appointment>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>
                <div>
                  <img
                    src="https://avatars1.githubusercontent.com/u/36273680?s=460&u=e59c95a5c92f108ee2c013335fa8de23893f6516&v=4"
                    alt="Cliente"
                  />
                  <strong>Cliente Henrq</strong>
                </div>
              </Appointment>
            </Section>

            <Section>
              <strong>Tarde</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>
                <div>
                  <img
                    src="https://avatars1.githubusercontent.com/u/36273680?s=460&u=e59c95a5c92f108ee2c013335fa8de23893f6516&v=4"
                    alt="Cliente"
                  />
                  <strong>Cliente Henrq</strong>
                </div>
              </Appointment>
            </Section>
          </Schedule>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()} //Nao deixa voltar para meses passados
              disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]} //desabilita domingo e sabado
              modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
              onMonthChange={handleMonthChange}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Content>
      </Header>
    </Container>
  );
};

export default Dashboard;
