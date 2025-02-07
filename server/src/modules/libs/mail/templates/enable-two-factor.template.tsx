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
  
  interface Enable2FATemplateProps {
	domain: string;
  }
  
  export function Enable2FATemplate({ domain }: Enable2FATemplateProps) {
	const settingsLink = `${domain}/dashboard/settings`;
  
	return (
	  <Html>
		<Head />
		<Preview>🔐 Усильте защиту вашего аккаунта</Preview>
		<Tailwind>
		  <Body className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100">
			<Section className="text-center mb-8 bg-white rounded-lg shadow-md p-6">
			  <Heading className="text-3xl text-purple-600 font-bold">
				🔒 Включите двухфакторную аутентификацию
			  </Heading>
			  <Text className="text-base text-gray-700 mt-4">
				Двухфакторная аутентификация (2FA) добавляет дополнительный уровень защиты, требуя не только пароль, но и уникальный код, известный только вам.
			  </Text>
			  <Link
				href={settingsLink}
				className="mt-6 inline-block rounded-lg bg-purple-600 text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
			  >
				🔧 Настроить 2FA
			  </Link>
			</Section>
  
			<Section className="mt-8 bg-gray-100 from-blue-200 to-indigo-200 rounded-lg shadow-md p-6">
			  <Heading className="text-2xl text-purple-600 font-semibold text-center mb-4">
				❓ Почему это важно?
			  </Heading>
			  <Text className="text-center text-lg text-gray-700 mb-4">
				Включение 2FA помогает:
			  </Text>
			  <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg pl-4">
				<li className="p-2">🛡️ Защитить ваш аккаунт от несанкционированного доступа</li>
				<li className="p-2">🔑 Обезопасить личные данные</li>
				<li className="p-2">📲 Использовать современный стандарт безопасности</li>
			  </ul>
			</Section>
  
			<Section className="text-center mt-8 bg-white rounded-lg shadow-md p-6">
			  <Heading className="text-xl text-purple-600 font-semibold">
				🚀 Готовы начать?
			  </Heading>
			  <Text className="text-sm text-gray-600 mt-2">
				Перейдите в настройки аккаунта и включите двухфакторную аутентификацию прямо сейчас!
			  </Text>
			  <Text className="text-sm text-gray-600 mt-4">
				Если у вас есть вопросы, напишите нам на {" "}
				<Link
				  href="mailto:support@yourdomain.com"
				  className="text-blue-600 underline hover:text-blue-700 transition duration-300"
				>
				  kanishevilya1@gmail.com
				</Link>.
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
  