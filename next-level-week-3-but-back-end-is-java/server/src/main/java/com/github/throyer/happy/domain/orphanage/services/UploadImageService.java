package com.github.throyer.happy.domain.orphanage.services;

import com.github.throyer.happy.domain.orphanage.models.File;
import com.github.throyer.happy.infra.envs.SftpAuthProperties;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.util.List;

import static java.lang.String.format;
import static java.util.Optional.ofNullable;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

@Slf4j
@Service
@AllArgsConstructor
public class UploadImageService {
  private final SftpAuthProperties properties;
  private final JSch jsch = new JSch();
  
  public void upload(List<File> files) {
    Session session = null;
    Channel channel = null;
    ChannelSftp channelSftp = null;

    try {
      log.info("iniciando acesso SFTP para o upload de: {}", String.join(", ", files.stream().map(File::getFilename).toList()));

      var username = properties.getUsername();
      var host = properties.getHost();
      var port = properties.getPort();
      var password = properties.getPassword();
      var dir = properties.getDirectory();

      session = jsch.getSession(username, host, port);

      session.setPassword(password);

      var config = new java.util.Properties();

      // habilitando algoritimo legado de criptografia (portanto menos seguro),
      // pois o servidor não suporta os novos.
      // https://github.com/mwiede/jsch?tab=readme-ov-file#are-ssh-ed25519-ssh-ed448-curve25519-sha256-curve448-sha512--chacha20-poly1305opensshcom-supported
      config.put("StrictHostKeyChecking", "no");
      config.put("server_host_key", session.getConfig("server_host_key") + ",ssh-rsa");
      config.put("PubkeyAcceptedAlgorithms", session.getConfig("PubkeyAcceptedAlgorithms") + ",ssh-rsa");

      session.setConfig(config);
      session.connect();

      log.info("conectado em host: '{}', port: '{}', username: '{}'", host, port, username);

      channel = session.openChannel("sftp");
      log.info("iniciando sessao sftp");
      channel.connect();
      channelSftp = (ChannelSftp) channel;

      log.info("entrando no diretorio: '{}'", dir);
      channelSftp.cd(dir);

      for (File file : files){
        write(file, channelSftp);
      }

    } catch (JSchException | SftpException exception) {
      throw new RuntimeException(exception);
    } finally {

      ofNullable(channelSftp)
        .ifPresent(sftp -> {
          log.info("finalizando sessao sftp");
          sftp.exit();
        });

      ofNullable(channel)
        .ifPresent(connected -> {
          log.info("desconectado sessao");
          connected.disconnect();
        });

      ofNullable(session)
        .ifPresent(connected -> {
          log.info("desconectado do host");
          connected.disconnect();
        });
    }
  }
  
  public void write(File file, ChannelSftp sftp) throws SftpException {
    sftp.put(new ByteArrayInputStream(file.getBytes()), file.getFilename());
    log.info("arquivo {} transferido com sucesso", file.getFilename());
  }
}
