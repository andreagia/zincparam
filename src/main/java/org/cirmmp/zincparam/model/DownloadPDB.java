package org.cirmmp.zincparam.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@JsonAutoDetect
@Getter @Setter
@NoArgsConstructor
public class DownloadPDB {
    private List<String> filepdb;

}
