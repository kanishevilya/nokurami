import {
  Body,
  Head,
  Heading,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Html } from "@react-email/html";
import * as React from "react";

interface VerificationTemplateProps {
  domain: string;
  token: string;
}

export function VerificationTemplate({
  domain,
  token,
}: VerificationTemplateProps) {
  const verificationLink = `${domain}/account/verify?token=${token}`;

  return (
    <Html>
      <Head />
      <Preview>Подтвердите ваш аккаунт в нашем сервисе</Preview>
      <Tailwind>
        <Body className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100">
          <Section className="text-center mb-8 bg-white rounded-lg shadow-md p-6">
            <Heading className="text-3xl text-purple-600 font-bold">Добро пожаловать в Nokurami!</Heading>
            <Text className="text-base text-gray-700 mt-4">
              Спасибо, что выбрали нас. Мы рады приветствовать вас в нашем сообществе! Для завершения регистрации и
              подтверждения вашего аккаунта, пожалуйста, перейдите по ссылке ниже.
            </Text>
            <Link
              href={verificationLink}
              className="mt-6 inline-block rounded-lg bg-purple-600 text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
            >
              Подтвердить мою почту
            </Link>
          </Section>


          <Section className="mt-8 bg-gray-100 from-purple-200 to-indigo-200 rounded-lg shadow-md p-6">
            <Heading className="text-2xl text-purple-600 font-semibold text-center mb-4">
              Что вас ждет после подтверждения
            </Heading>
            <Text className="text-center text-lg text-gray-700 mb-4">
              После подтверждения вы получите доступ ко всем функциям нашего сервиса, включая:
            </Text>
            <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg pl-4">
              <li className="p-2">Отслеживание каналов</li>
              <li className="p-2">Добавление контента в избранное</li>
              <li className="p-2">Управление подпиской</li>
              <li className="p-2">Использование чата</li>
              <li className="p-2">Настройка уведомлений</li>
            </ul>
          </Section>

          <Section className="text-center mt-8 bg-white rounded-lg shadow-md p-6">
            <Heading className="text-xl text-purple-600 font-semibold">Возникли проблемы?</Heading>
            <Text className="text-sm text-gray-600 mt-2">
              Если ссылка не работает, скопируйте и вставьте следующую ссылку в адресную строку вашего браузера:
            </Text>
            <Text className="text-sm text-purple-600 break-words mt-2 bg-gray-100 p-2 rounded">{verificationLink}</Text>
            <Text className="text-sm text-gray-600 mt-4">
              Если у вас есть вопросы или вы столкнулись с трудностями, напишите нам на{" "}
              <Link
                href="mailto:kanishevilya1@gmail.com"
                className="text-purple-600 underline hover:text-purple-700 transition duration-300"
              >
                kanishevilya1@gmail.com
              </Link>
              .
            </Text>
          </Section>

          <Section className="text-center mt-8">
            <Text className="text-xs text-gray-500">
              Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
